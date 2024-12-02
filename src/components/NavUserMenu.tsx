import api from "@/api/instance";
import { pathJustPostV1 } from "@/api/path";
import { handleApiRequest } from "@/utils/api";
import { cn } from "@/utils/classname";
import { getUserAccessToken, removeUserAccessToken } from "@/utils/user";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type NavUserMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type MenuList = {
  name: string;
  linkTo?: string;
  onClick?: () => void;
};

export function NavUserMenu({
  isOpen,
  setIsOpen,
  className,
  ...props
}: NavUserMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const MenuListsComp = () => {
    const menus: MenuList[] = [
      { name: "Account", linkTo: "/account" },
      { name: "Logout", onClick: handleLogout },
    ];

    return menus.map((menu, index) => (
      <button
        key={`profile-menu-list-${index}`}
        className="rounded-md px-10 py-1 hover:bg-gray-200"
        onClick={
          menu.onClick
            ? menu.onClick
            : () => router.push(menu.linkTo ?? "/login")
        }
      >
        {menu.name}
      </button>
    ));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await handleApiRequest(
      api.post(
        pathJustPostV1.auth.logout,
        {},
        { headers: { Authorization: getUserAccessToken() } },
      ),
    );

    if (error) {
      console.error(error);
      return;
    }

    removeUserAccessToken();
    router.push("/login");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {isOpen && (
        <div
          {...props}
          className={cn(
            "absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg border border-gray-400 border-opacity-30 bg-white p-2 drop-shadow-md",
            className,
          )}
          ref={ref}
        >
          <MenuListsComp />
        </div>
      )}
    </div>
  );
}
