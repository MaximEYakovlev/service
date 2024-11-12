async function saveData(data) {
  const { dtNextBox, dtTillMax, warehouseList } = data;

  let periodId;
  const period = await knex('periods').where({ dtNextBox, dtTillMax }).first();
  if (period) {
    periodId = period.id;
  } else {
    [periodId] = await knex('periods')
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
    const existingWarehouse = await knex('warehouses')
      .where({ warehouseName })
      .first();
    if (existingWarehouse) {
      warehouseId = existingWarehouse.id;
    } else {
      [warehouseId] = await knex('warehouses')
        .insert({ warehouseName })
        .returning('id');
    }

    await knex('tariffs').insert({
      period_id: periodId,
      warehouse_id: warehouseId,
      boxDeliveryAndStorageExpr,
      boxDeliveryBase,
      boxDeliveryLiter,
      boxStorageBase,
      boxStorageLiter,
    });
  }
}
