import React, { useState } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleFormSubmit = async e => {
        e.preventDefault();

        const billingDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            address: {
                city: e.target.city.value,
                line1: e.target.address.value,
                state: e.target.state.value,
                postal_code: e.target.zip.value,
            },
        };
    };
    const cardElementOptions = {
        //a way to inject styles into that iframe
        style: {
            base: {
                fontSize: "16px",
                color: "#fff",
                "::placeholder": {
                    color: "#87bbfd",
                },
            },
            invalid: {
                color: "#FFC7EE",
                iconColor: "#FFC7EE",
            },
        },
        hidePostalCode: true,
    };
    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <CardElement options={cardElementOptions} />
            </form>
        </>
    );
};
export default CheckoutForm;
