import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Posts from "../../../models/Posts";
import { find } from "../../../services/Service";
import { ToastAlert } from "../../../utils/ToastAlert";
import CardPosts from "../cardposts/CardPosts";

function ListPosts() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [posts, setPosts] = useState<Posts[]>([]);

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    if (token === "") {
      ToastAlert("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    findPosts();
  }, [posts.length]);

  async function findPosts() {
    try {
      setIsLoading(true);

      await find("/posts", setPosts, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && posts.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhuma Postagem foi encontrada!
            </span>
          )}

          <div
            className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8"
          >
            {posts.map((posts) => (
              <CardPosts key={posts.id} posts={posts} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListPosts;
