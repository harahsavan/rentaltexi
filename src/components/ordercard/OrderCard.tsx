import React from 'react'

type OrderData = {
    name: string;
    email: string;
    phoneNumber: string;
    discountedPrice: string;
    finalPayableAmount: string;
    pickUpDate: string;
    pickUpTime: string;
    city: string;
    returnDate: string;
    price: string;
    selectedCar: string;
    from: string;
    to: string;
    distance: string;
  };

const OrderCard = ({ data, index }: { data: OrderData; index: number }) => {
    return (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-lg font-bold">No.{index + 1}</h3>
            <p className="text-gray-500 text-sm mt-1">
                <span className="text-md font-bold">Name: </span>{data?.name}
            </p>
            <p className="text-gray-500 text-sm mt-1">
                <span className="text-md font-bold">Email: </span>{data?.email}
            </p>
            <p className="text-gray-500 text-sm mt-1">
                <span className="text-md font-bold">Contact Number: </span> {data?.phoneNumber}
            </p>
            <p className="text-gray-500 text-sm mt-1">
                <span className="text-md font-bold">Car: </span> {data?.selectedCar}
            </p>
            <p className="text-gray-500 text-sm mt-1">
                <span className="text-md font-bold">City: </span> {data?.from} {">"} {data?.to}
            </p>
            <p className="text-gray-500 text-sm mt-1">
                <span className="text-md font-bold">Distance: </span>{data?.distance}
            </p>
            <p className="text-gray-500 text-sm mt-1">
                <span className="text-md font-bold">PICK UP Date: </span>{data?.pickUpDate}
            </p>
            <p className="text-gray-500 text-sm mt-1">
                <span className="text-md font-bold">PICK UP Time: </span>{data?.pickUpTime}
            </p>
            {data.city && (
                <p className="text-gray-500 text-sm mt-1">
                    <span className="text-md font-bold">City: </span>{data?.city}
                </p>
            )}
            {data.returnDate && (
                <p className="text-gray-500 text-sm mt-1">
                    <span className="text-md font-bold">Return Date: </span>{data?.returnDate}
                </p>
            )}
            <p className="text-gray-500 text-sm mt-1">
                <span className="text-md font-bold">Rate: </span>{data?.price}₹
            </p>
            <p className="text-gray-500 text-sm mt-1">
                <span className="text-md font-bold">Cash On Pay: </span>{data?.discountedPrice}₹
            </p>
            <p className="text-gray-500 text-sm mt-1">
                <span className="text-md font-bold">Online Payment : </span>{data?.finalPayableAmount}₹
            </p>
        </div>
    )
}

export default OrderCard
