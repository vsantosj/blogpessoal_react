import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

function Footer() {
  let data = new Date().getFullYear();

  return (
    <>
      <footer className='flex justify-center text-white bg-indigo-900'>
        <div className='container flex flex-col items-center py-4'>
          <p className='text-xl font-bold'>
            Blog Pessoal Generation | Copyright: {data}
          </p>

          <p className="text-lg">
            Acesse nossas redes sociais
          </p>

          <ul className='flex gap-2'>
            <li>
              <a href='https://www.linkedin.com/school/generationbrasil' target='_blank'>
                <LinkedinLogoIcon size={48} weight='bold' />
              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/generationbrasil' target='_blank'>
                <InstagramLogoIcon size={48} weight='bold' />
              </a>
            </li>
            <li>
              <a href='https://www.facebook.com/generationbrasil' target='_blank'>
                <FacebookLogoIcon size={48} weight='bold' />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
