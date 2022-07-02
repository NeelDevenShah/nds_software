const Aquantity=2500;
const Rquantity=3000;
const Dquantity=1500;

const totalQuantity=Aquantity+Rquantity+Dquantity;
const Apercentage=(Aquantity/totalQuantity)*100;
const Rpercentage=(Rquantity/totalQuantity)*100;
const Dpercentage=(Dquantity/totalQuantity)*100;
export const StockData=[
    {
        id: 1,
        type: 'Active Stock',
        quantity: Apercentage.toFixed(1),

    },
    {
        id: 2,
        type: 'Regular Stock',
        quantity: Rpercentage.toFixed(1),
    },
    {
        id: 3,
        type: 'Dead Stock',
        quantity: Dpercentage.toFixed(1),
    }
]

export default StockData