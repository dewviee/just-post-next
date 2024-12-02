import api from "@/api/instance";
import { pathJustPostV1 } from "@/api/path";
import { TUserProfile } from "@/types/user.type";
import { handleApiRequest } from "@/utils/api";
import { cn } from "@/utils/classname";
import { getUserAccessToken } from "@/utils/user";
import { useRouter } from "next/navigation";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { GoHomeFill } from "react-icons/go";
import Button from "./Button";
import { NavUserInfo } from "./NavUserInfo";

type NavBarProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  active: (typeof pageLists)[number];
};

type menuLists = {
  label: string;
  icon?: ReactNode;
  onclick?: () => void;
};

/** must order with @menuLists */
const pageLists = ["none", "home"] as const;

export function NavBar({ className, active }: NavBarProps) {
  const router = useRouter();
  const [fetching, setIsFetching] = useState(false);
  const [user, setUser] = useState<TUserProfile>({});

  useEffect(() => {
    const controller = new AbortController();
    handleGetUserProfile(controller);

    return () => controller.abort();
  }, []);

  const handleGetUserProfile = async (controller: AbortController) => {
    const { result } = await handleApiRequest(
      api.get(pathJustPostV1.user.getUserProfile, {
        headers: { Authorization: getUserAccessToken() },
        signal: controller.signal,
      }),
      setIsFetching,
    );

    if (result?.data) {
      const data = result.data.data as TUserProfile;
      setUser(data);
    }
  };

  const menuListsComp = () => {
    const menuLists: menuLists[] = [
      {
        label: "หน้าแรก",
        icon: <GoHomeFill className="h-6 w-6" />,
        onclick: () => router.push("/"),
      },
    ];

    return menuLists.map((menu, index) => (
      <Button
        className={cn(
          "bg-white p-3 text-black hover:bg-gray-200",
          active === pageLists[index + 1] ? "font-bold" : "",
        )}
        key={`${menu.label}-${index}`}
      >
        {menu.icon}
        <span className="hidden w-16 sm:block">{menu.label}</span>
      </Button>
    ));
  };

  return (
    <nav
      className={cn(
        "fixed flex h-[100vh] w-[30vw] flex-col items-end gap-1 p-4",
        className,
      )}
    >
      <div className="flex flex-grow flex-col">{menuListsComp()}</div>

      <NavUserInfo displayName={user.username} fetching={fetching} />
    </nav>
  );
}
