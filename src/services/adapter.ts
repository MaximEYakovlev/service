export const adapter = (input: any) => {
  const { dtNextBox, dtTillMax, warehouseList } = input;

  const period = {
    dtNextBox: dtNextBox || null,
    dtTillMax: dtTillMax || null,
  };

  const warehouses = warehouseList.map((warehouse: any) => ({
    warehouseName: warehouse.warehouseName,
    boxDeliveryAndStorageExpr: parseDecimal(
      warehouse.boxDeliveryAndStorageExpr
    ),
    boxDeliveryBase: parseDecimal(warehouse.boxDeliveryBase),
    boxDeliveryLiter: parseDecimal(warehouse.boxDeliveryLiter),
    boxStorageBase: parseDecimal(warehouse.boxStorageBase),
    boxStorageLiter: parseDecimal(warehouse.boxStorageLiter),
  }));

  return { period, warehouses };
};

const parseDecimal = (value: any) => {
  return value === '-' ? null : parseFloat(value);
};
