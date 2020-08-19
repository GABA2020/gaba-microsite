import React, { useState, useRef, useEffect } from "react";

export default function PaypalButtons() {
    const [paidFor, setPaidFor] = useState(false);
    const [loaded, setLoaded] = useState(false);

    let paypalRef = useRef();

    const product = {
        price: 25.0,
        description: "GABA Bronze",
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://www.paypal.com/sdk/js?client-id=AbktJfCjRJpmRFUKwPx9r2fsJZxp820niyHLkxItdUMYqAuKkFQmKjnWloipXZ0lIZP703iAPlTsBBUJ";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);

        if (loaded) {
            setTimeout(() => {
                window.paypal
                    .Buttons({
                        createOrder: (data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        description: product.description,
                                        amount: {
                                            value: product.price,
                                        },
                                    },
                                ],
                            });
                        },
                        onApprove: async (data, actions) => {
                            const order = await actions.order.capture();
                            alert(`Transaction completed by ${order.payer.name.given_name}`)
                            setPaidFor(true);
                            console.log(order);
                        },
                    })
                    .render(paypalRef);
            });
        }
    });

    return (
        <div className="PaypalButtons">
            {paidFor ? (
                <div>
                    <h1>Congrats, you just bought a GABA Bronze membership!</h1>
                </div>
            ) : (
                <div>
                    <h1>
                        {product.description} for ${product.price}
                    </h1>
                    <div ref={e => (paypalRef = e)} />
                </div>
            )}
        </div>
    );
}
