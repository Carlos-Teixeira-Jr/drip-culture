import CartImage from "../../../assets/icons/cart-icon.png";
import UserImage from "../../../assets/icons/user.png";
import LogOutImage from "../../../assets/icons/logout-icon.png";
import { useEffect, useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import { setLoading } from "../../../slices/productsSlice";
import { useDispatch } from "react-redux";

export type SelectedOption = {
  orders: boolean;
  account: boolean;
};

interface ISideMenu {
  onSelectedOptionChange: (key: SelectedOption) => void;
}

export function SideMenu({
  onSelectedOptionChange,
}: ISideMenu) {
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    orders: true,
    account: false,
  });
  const [optionName, setOptionName] = useState("orders");
  const dispatch = useDispatch();
  const { signOut } = useClerk();

  const options = [
    {
      id: 1,
      title: "Orders",
      key: "orders",
      icon: CartImage,
    },
    {
      id: 2,
      title: "Account Details",
      key: "account",
      icon: UserImage,
    },
    {
      id: 3,
      title: "Logout",
      key: "logout",
      icon: LogOutImage,
    },
  ];

  const handleSelectOption = (key: "orders" | "account") => {
    if (key === "orders" && !selectedOption[key]) {
      setSelectedOption({ orders: true, account: false });
    }
    if (key === "account" && !selectedOption[key]) {
      setSelectedOption({ orders: false, account: true });
    }
    setOptionName(key);
  };

  useEffect(() => {
    onSelectedOptionChange(selectedOption);
  }, [selectedOption]);

  const handleLogOut = () => {
    dispatch(setLoading(true))
    signOut({
      redirectUrl: "/",
    });
  };

  return (
    <nav className="md:pr-9 md:pt-28.5 py-10 md:pb-[20rem] flex md:border-r-2 border-borderColor">
      <ul className="flex flex-col justify-center gap-4">
        {options.map((option) => (
          <li
            key={option.id}
            className="side-menu-option"
            onClick={() => {
              if (option.key !== "logout") {
                handleSelectOption(option.key as "orders" | "account");
              } else {
                handleLogOut();
              }
            }}
          >
            <img src={option.icon} alt="" className="w-6 h-6" />
            <h5
              className={`${
                option.key === optionName ? "text-neutral" : "text-vividBlack"
              }`}
            >
              {option.title}
            </h5>
          </li>
        ))}
      </ul>
    </nav>
  );
}

