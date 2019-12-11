import {
    formatData, currencyFormatter, negativeCurrencyFormatter
} from "../../src/utils/formattingUtils";

describe('Formating utils', () => {
    it('should format the data', async () => {
        const accountKPIs = [{
            gross_sales: "161839592.809999913",
            lot_depletion: "-19039980.7400000021",
            aged_off: "0",
            current_lot_balance: "263649388.019999862",
            commission_earned: "12215.2448390285972"
        }]
        const formatedData = formatData(accountKPIs);
        expect(formatedData[0].aged_off).toBe("0.00");
        expect(formatedData[0].commission_earned).toBe("12,215.24");
        expect(formatedData[0].current_lot_balance).toBe("263,649,388.02");
        expect(formatedData[0].gross_sales).toBe("161,839,592.81");
        expect(formatedData[0].lot_depletion).toBe("(19,039,980.74)");
    });

    it('should format the positive currency', async () => {
        const curency = currencyFormatter({ value: 1234.56 });
        expect(curency).toBe("$1,234.56");
    })

    it('should format the negative currency', async () => {
        const curency = negativeCurrencyFormatter({ value: -1234.56 });
        expect(curency).toBe("($1,234.56)");
    })
})