import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { IAddress } from "../../../interfaces/address.interface";

interface IAddresProps {
  onAddressChange: (address: IAddress) => void;
}

export function Address({onAddressChange}: IAddresProps) {

  const { user } = useUser();

  const [addressFormData, setAddressFormData] = useState<IAddress>({
    zipcode: "",
    country: "",
    city: "",
    state: "",
    street: "",
  });
  console.log("🚀 ~ Address ~ addressFormData:", addressFormData)

  const [addresErrors, setAddressErrors] = useState<IAddress>({
    zipcode: "",
    country: "",
    city: "",
    state: "",
    street: "",
  });

  const [userFormData, setUserFormData] = useState({
    email: "",
    name: "",
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  })

  const addressInputs = [
    {
      label: "ZipCode",
      name: "zipcode",
      value: addressFormData.zipcode,
    },
    {
      label: "Country",
      name: "country",
      value: addressFormData.country,
    },
    {
      label: "City",
      name: "city",
      value: addressFormData.city,
    },
    {
      label: "State",
      name: "state",
      value: addressFormData.state,
    },
    {
      label: "Street Address",
      name: "street",
      value: addressFormData.street,
    },
  ];

  const userInputs = [
    {
      label: "Email",
      name: "email",
      value: userFormData.email,
    },
    {
      label: "Full Name",
      name: "name",
      value: userFormData.name,
    },
  ];

  useEffect(() => {
    if (user) {
      setUserFormData({
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName ?? "",
      });
    }
  },[user])

  useEffect(() => {
    onAddressChange(addressFormData)
  },[addressFormData])

  const handleAddressInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    const value = e.target.value;
    setAddressFormData({ ...addressFormData, [input]: value });

    if (input === "zipcode" && value.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setAddressFormData({
            ...addressFormData,
            country: data.bairro,
            city: data.localidade,
            state: data.uf,
            street: data.logradouro,
          });
        } else {
          setShowToast({
            show: true,
            message: "Error fetching address",
            type: "error",
          })
        }
      } catch (error) {
        console.error(error);
        setShowToast({
          show: true,
          message: "Error fetching address",
          type: "error",
        })
      }
    }
  };

  return (
    <section className="flex flex-col md:w-[719px]">
      <h1 className="pb-16">Shipping Address</h1>
      <div className="md:grid md:grid-cols-2 flex flex-col gap-4">
        {addressInputs.map((input, idx) => (
          <div
            key={idx}
            className={`w-full ${
              idx === addressInputs.length - 1 ? "col-span-2" : ""
            }`}
          >
            <h5 className="text-neutral">{input.label}</h5>
            <input
              name={input.name}
              value={input.value}
              className="w-full mt-1"
              onChange={(e) => handleAddressInputChange(e, input.name)}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row space-x-4 py-13">
        {userInputs.map((input, idx) => (
          <div key={idx} className="w-full">
            <h5 className="">{input.label}</h5>
            <input
              name={input.name}
              value={input.value}
              disabled
            />
          </div>
        ))}
      </div>
    </section>
  );
}
