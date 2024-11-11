export type TariffData = {
  dtNextBox: string;
  dtTillMax: string;
  warehouseList: Warehouse[];
};

type Warehouse = {
  boxDeliveryAndStorageExpr: string;
  boxDeliveryBase: string;
  boxDeliveryLiter: string;
  boxStorageBase: string;
  boxStorageLiter: string;
  warehouseName: string;
};
