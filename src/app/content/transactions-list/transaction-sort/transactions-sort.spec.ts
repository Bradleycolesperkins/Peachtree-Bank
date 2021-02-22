// Http testing module and mocking controller
import { TestBed } from '@angular/core/testing';
import { ArraySortPipe } from './transaction-sort.pipe';

describe('TransactionsSort', () => {


    it('create an instance', () => {
      const pipe = new ArraySortPipe();
      expect(pipe).toBeTruthy();
    });

    it('should display in dates descending order', () => {
      const array = [
        {
          dates: {
            valueDate: 3
          },
        },
        {
          dates: {
            valueDate: 1
          },
        },
        {
          dates: {
            valueDate: 2
          },
        }
      ];
      const pipe = new ArraySortPipe();
      expect(pipe).toBeTruthy();

      const result = pipe.transform(array);

      expect(result[0].dates.valueDate).toBe(3);
      expect(result[1].dates.valueDate).toBe(2);
      expect(result[2].dates.valueDate).toBe(1);
    });

});
