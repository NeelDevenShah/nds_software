const oquantity=288;
const pquantity=54;
const squantity=288;

const totalQuantity=oquantity+pquantity+squantity;
const opercentage=(oquantity/totalQuantity)*100;
const ppercentage=(pquantity/totalQuantity)*100;
const spercentage=(squantity/totalQuantity)*100;

export const ActivityData=[
    {
        id: 1,
        type: 'Orders To Be Ordered/Produced',
        quantity: opercentage.toFixed(1),
    },
    {
        id: 2,
        type: 'Orders To Be Packed',
        quantity: ppercentage.toFixed(1),
    },
    {
        id: 3,
        type: 'Orders To Be Shiped',
        quantity: spercentage.toFixed(1),
    },
]

export default ActivityData
