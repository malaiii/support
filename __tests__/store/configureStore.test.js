import store from '../../src/store/configureStore';

describe('store', () => {
    it("should not be null", () => {
        expect(store).not.toEqual(undefined);
    });
})