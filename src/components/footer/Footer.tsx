import {
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
  const data = new Date().getFullYear();

  const { user } = useContext(AuthContext);

  let component: ReactNode;

  if (user.token !== "") {
    component = (
      <footer className="flex justify-center text-white bg-indigo-900">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">
            Blog Pessoal Generation | Copyright: {data}
          </p>

          <p className="text-lg">Acesse nossas redes sociais</p>

          <ul className="flex gap-2">
            <li>
              <a href="https://www.linkedin.com/in/vsantosj" target="_blank">
                <LinkedinLogoIcon size={48} weight="bold" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/vivi_santos_dev"
                target="_blank"
              >
                <InstagramLogoIcon size={48} weight="bold" />
              </a>
            </li>
            <li>
              <a href="https://github.com/vsantosj" target="_blank">
                <GithubLogoIcon size={48} weight="bold" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
  return <>{component}</>;
}

export default Footer;
