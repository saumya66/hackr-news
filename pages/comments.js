import { useState, useEffect } from "react";
import axios from "axios";
import PostComp from "../components/PostComp";
import styles1 from "../styles/Page.module.css";
import styles2 from "../styles/Comments.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const Post = ({ comment, post }) => {
  const [currPost, setCurrPost] = useState();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(async () => {
    setComments(comment);
    setCurrPost(post);
    setLoading(false);
  }, []);

  const ParsedComment = ({ str }) => {
    return parse(`${str}`);
  };

  const Comment = (props) => {
	function time2TimeAgo(ts) {
 
		var d=new Date();  
		var nowTs = Math.floor(d.getTime()/1000);  
		var seconds = nowTs-ts;
	
 		if (seconds > 2*24*3600) {
		   return "a few days ago";
		}
 		if (seconds > 24*3600) {
		   return "yesterday";
		}
	
		if (seconds > 3600) {
		   return "a few hours ago";
		}
		if (seconds > 1800) {
		   return "Half an hour ago";
		}
		if (seconds > 60) {
		   return Math.floor(seconds/60) + " minutes ago";
		}
	}
    return (
      <div className={styles2.comments}>
         <div className={styles2.rowOne}>
          <div className={styles2.userName}>
            <FontAwesomeIcon icon={faUser} />
            <Link href={{ pathname: "profile", query: { userId: props.name } }}>
              <p className={styles2.name}>{props.name}</p>
            </Link>
          </div>
          <div className={styles2.time}>
            <p>{time2TimeAgo(props.time)}</p>
          </div>
        </div>
        <div className={styles2.rowSecond}>
          <ParsedComment str={props.text} />
        </div>
        <div className={styles2.rowThird}></div>
      </div>
    );
  };
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <title>HackrNews</title>
        <meta
          name="description"
          content="HackrNews is a Super Clean, Cross-Platform, Revamped version of HackerNews filled with the top-most Interesting Tech News & Updates from around the world!"
        />
        <meta
          property="og:title"
          content="HackrNews - Read HackerNews with Ease."
        />
        <meta
          property="og:description"
          content="HackrNews is a Super Clean, Cross-Platform, Revamped version of HackerNews filled with the top-most Interesting Tech News & Updates from around the world!"
        />
        <meta property="og:url" content="https://hackrnews.vercel.app/" />
      </Head>
      <div className={styles1.page}>
        <div className={styles1.list}>
          <PostComp
            key={post?.id}
            id={post?.id}
            name={post?.title}
            comments={post?.descendants}
            by={post?.by}
            points={post?.score}
            type={post?.type}
            time={post?.time}
            url={post?.url}
          />
          <div className={styles2.pageTitle}>
            <p className={styles2.pageName}>Comments</p>
          </div>

          {
            comments &&
              comments.map((comment) => {
                return (
                  <Comment
                    key={comment?.id}
                    name={comment?.by}
                    text={comment?.text}
                    parent={comment?.parent}
                    id={comment?.id}
                    type={comment?.type}
                    time={comment?.time}
                  />
                );
              })
            //	)
            // : (
            // 	<p> Loading...</p>
            // )
          }
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const postId = query.postId;
  const post = await axios
    .get(
      `https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`
    )
    .then((res) => res.data);
  const cmntIds = await post.kids;
  const commentPromises =
    cmntIds &&
    cmntIds.map(async (id) => {
      return await axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
        .then((res) => res.data);
    });

  var comment =
    commentPromises &&
    (await Promise?.all(commentPromises).then((res) => {
      return res;
    }));
  comment = comment ? comment : null;
  return {
    props: { comment, post },
  };
}

export default Post;
