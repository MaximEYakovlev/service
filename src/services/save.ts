import { TariffResponse } from '../dto/interfaces';
import { db } from '../db/db';

export const saveData = async (tariffResponse: TariffResponse) => {
  const { dtNextBox, dtTillMax, warehouseList } = tariffResponse.response.data;

  let periodId;
  const period = await db('periods').where({ dtNextBox, dtTillMax }).first();
  if (period) {
    periodId = period.id;
  } else {
    [periodId] = await db('periods')
      .insert({ dtNextBox, dtTillMax })
      .returning('id');
  }

  for (const warehouse of warehouseList) {
    const {
      warehouseName,
      boxDeliveryAndStorageExpr,
      boxDeliveryBase,
      boxDeliveryLiter,
      boxStorageBase,
      boxStorageLiter,
    } = warehouse;

    let warehouseId;
    const existingWarehouse = await db('warehouses')
      .where({ warehouseName })
      .first();
    if (existingWarehouse) {
      warehouseId = existingWarehouse.id;
    } else {
      [warehouseId] = await db('warehouses')
        .insert({ warehouseName })
        .returning('id');
    }

    await db('tariffs').insert({
      period_id: periodId,
      warehouse_id: warehouseId,
      boxDeliveryAndStorageExpr,
      boxDeliveryBase,
      boxDeliveryLiter,
      boxStorageBase,
      boxStorageLiter,
    });
  }
};
