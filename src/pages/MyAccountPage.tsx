import { useState } from "react";
import { AuthBreadCrumb } from "../components/breadcrumbs/authBreadCrumb/AuthBreadCrumb";
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
      <AuthBreadCrumb />
      <div className="flex my-14.5 w-full">
        <SideMenu
          onSelectedOptionChange={(selectedOption: SelectedOption) =>
            setSelectedOption(selectedOption)
          }
        />
        {selectedOption.orders ? <OrdersContainer /> : <AccountDetailsContainer/>}
      </div>
    </>
  );
}
