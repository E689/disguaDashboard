import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const pathname = usePathname();
  const pathnames = decodeURIComponent(pathname)
    .split("/")
    .filter((x) => x);
  return (
    <div className="mx-2 justify-center py-5 mt-3 border-b px-5 flex gap-2 items-center">
      {pathnames.map((url, index, arr) => {
        if (arr.length - 1 === index) {
          return (
            <span key={index} className="cursor-pointer">
              {url}
            </span>
          );
        }
        const route = arr.slice(0, index + 1).join("/");

        return (
          <>
            <Link
              href={`/${route}`}
              key={index}
              className="cursor-pointer underline"
            >
              {url}
            </Link>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </>
        );
      })}
    </div>
  );
}
