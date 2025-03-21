import { useState } from "react";
import { BreadCrumb } from "../components/breadcrumbs/breadCrumb/BreadCrumb";
import {
  SelectedOption,
  SideMenu,
} from "../components/menus/sideMenu/SideMenu";
import { OrdersContainer } from "../components/products/ordersContainer/OrdersContainer";
import { AccountDetailsContainer } from "../components/user/accountDetails/AccountDetailsContainer";

export function MyAccountPage() {
  const [selectedOption, setSelectedOption] = useState({
    orders: true,
    account: false,
  });

  return (
    <>
      <BreadCrumb />
      <div className="flex flex-col md:flex-row md:my-14.5 w-full md:pr-89 md:pl-45">
        <SideMenu
          onSelectedOptionChange={(selectedOption: SelectedOption) =>
            setSelectedOption(selectedOption)
          }
        />
        {selectedOption.orders ? (
          <OrdersContainer />
        ) : (
          <AccountDetailsContainer />
        )}
      </div>
    </>
  );
}
