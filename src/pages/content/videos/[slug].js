import Image from "next/image";
import React, { useEffect, useState } from "react";
import videoImg from "../../../../public/video.jpg";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment/moment";
const video = ({ get_video_data, post_comment }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [data, set_data] = useState();
  const [comment, set_comment] = useState();

  const do_comment = () => {
    console.log(comment);
    post_comment(slug, comment);
  };

  useEffect(() => {
    const video_data = async () => {
      const res = await get_video_data(slug);
      set_data(res);
    };
    if (!slug) return;
    video_data();

    console.log("render");
  }, [slug]);
  return (
    <main className="main--area" id="pageBG">
      <section className="blog-area blog-details-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="blog-post-wrapper" style={{ marginBottom: "30px" }}>
              <div className="blog-post-item">
                <div
                  className="blog-post-thumb"
                  style={{ marginTop: "60px", marginBottom: "40px" }}
                >
                  {data?.playback_uri ? (
                    <Image src={videoImg} alt="img" />
                  ) : (
                    <div className="text-white text-2xl">{data?.state}</div>
                  )}
                </div>
                <div className="blog-post-content blog-details-content">
                  <div className="blog-post-meta">
                    <ul className="list-wrap" style={{ color: "white" }}>
                      <li>
                        By<a href="#">Admin</a>
                      </li>
                      <li>
                        <i className="far fa-calendar-alt"></i> Aug 16, 2023
                      </li>
                    </ul>
                  </div>
                  <h2 className="title">{data?.name}</h2>
                  <p>{data?.description}</p>

                  <div className="blog-details-bottom">
                    <div className="row">
                      <div className="col-xl-6 col-md-7">
                        <div className="tg-post-tags">
                          <h5 className="tags-title">tags :</h5>
                          <ul className="list-wrap d-flex flex-wrap align-items-center m-0">
                            <li>
                              <a href="#">Esports</a>,
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-xl-6 col-md-5">
                        <div className="blog-post-share justify-content-start justify-content-md-end">
                          <h5 className="share">share :</h5>
                          <ul className="list-wrap">
                            <li>
                              <a href="#">
                                <i className="fab fa-facebook-f"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fab fa-twitter"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* comments  */}
              <div className="comments-wrap">
                <h4 className="comments-wrap-title">
                  {data?.comments.length} Comments
                </h4>
                {data?.comments.map((e) => {
                  const d = new Date();
                  let time;
                  if (e.comment.data?.date) {
                    time = `${d.getDate(e.comment.data?.date)}/${
                      d.getMonth(e.comment.data?.date) + 1
                    }/${d.getFullYear(e.comment.data?.date)}`;
                    console.log({ time });
                  }

                  return (
                    <div className="latest-comments">
                      <ul className="list-wrap">
                        <li>
                          <div className="comments-box">
                            <div className="comments-avatar">
                              <Image
                                src={e.owner.data?.profile_image.replace(
                                  "ipfs://",
                                  "https://gateway.ipfscdn.io/ipfs/"
                                )}
                                alt="img"
                                width={100}
                                height={100}
                              />
                            </div>
                            <div className="comments-text">
                              <div className="avatar-name">
                                <h6 className="name">
                                  {e.owner.data?.username}
                                </h6>
                                <span className="date text-white">{time}</span>
                              </div>
                              <p>{e.comment.data?.comment_data}</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* post a comment  */}
              <div className="comment-respond">
                <h3 className="comment-reply-title">Post a comment</h3>
                <form className="comment-form" action="#">
                  <div className="form-grp">
                    <textarea
                      name="message"
                      onChange={(e) => set_comment(e.target.value)}
                      placeholder="Write a Comment *"
                      spellCheck="false"
                    ></textarea>
                  </div>
                  <button onClick={do_comment} type="button">
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default video;
