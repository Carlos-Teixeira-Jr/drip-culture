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
      <div className="px-44 flex gap-30 pt-18 pb-34">
        <Address onAddressChange={(address: IAddress) => setAddress(address)}/>
        <PlaceOrder address={address}/>
      </div>
    </main>
  )
}