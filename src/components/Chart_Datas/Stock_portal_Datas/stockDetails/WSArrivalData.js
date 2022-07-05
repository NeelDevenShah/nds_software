const w1quantity=100;
const w2quantity=1500;
const w3quantity=30;

const totalQuantity=w1quantity+w2quantity+w3quantity;
const w1percentage=(w1quantity/totalQuantity)*100;
const w2percentage=(w2quantity/totalQuantity)*100;
const w3percentage=(w3quantity/totalQuantity)*100;
export const WArivalData=[
    {
        id:1,
        type: 'Warehouse 1(in %)',
        quantity: w1percentage.toFixed(1),
    },
    {
        id:2,
        type: 'Warehouse 2(in %)',
        quantity: w2percentage.toFixed(1),
    },
    {
        id:3,
        type: 'Warehouse 3(in %)',
        quantity: w3percentage.toFixed(1),
    },
]

export default WArivalData