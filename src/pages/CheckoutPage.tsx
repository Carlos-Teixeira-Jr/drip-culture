import { useState } from "react";
import { BreadCrumb } from "../components/breadcrumbs/breadCrumb/BreadCrumb";
import { Address } from "../components/checkout/address/address";
import { PlaceOrder } from "../components/checkout/order/placeOrder";
import { IAddress } from "../interfaces/address.interface";

export function CheckoutPage() {
  const [address, setAddress] = useState<IAddress>({
    state:"",
    country: "",
    street: "",
    zipcode: "",
    city: ""
  });

  return (
    <main>
      <BreadCrumb/>
      <div className="md:px-44 px-2 flex flex-col md:flex-row md:gap-30 md:pt-18 pt-10 md:pb-34">
        <Address onAddressChange={(address: IAddress) => setAddress(address)}/>
        <PlaceOrder address={address}/>
      </div>
    </main>
  )
}