const oquantity=588;
const pquantity=534;
const squantity=988;

const totalQuantity=oquantity+pquantity+squantity;
const opercentage=(oquantity/totalQuantity)*100;
const ppercentage=(pquantity/totalQuantity)*100;
const spercentage=(squantity/totalQuantity)*100;

export const ActivityData=[
    {
        id: 1,
        type: 'Orders To Be Ordered/Produced(in %)',
        quantity: opercentage.toFixed(1),
    },
    {
        id: 2,
        type: 'Orders To Be Packed(in %)',
        quantity: ppercentage.toFixed(1),
    },
    {
        id: 3,
        type: 'Orders To Be Shiped(in %)',
        quantity: spercentage.toFixed(1),
    },
]

export default ActivityData
