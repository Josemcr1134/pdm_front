export interface ProductGoal {
  id: string,
  name: string,
  goal_type: string,
  consecutive: number,
  code_product_mga: string,
  product_mga: string,
  code_indicator_product_mga: string,
  indicator_product_mga: string,
  unit_measurement: {
    id: string,
    name: string
  },
  goal_four_years: number,
  code_ods: number,
  ods: string,
  bpin: string,
  responsible: string,
  unit_contract: string
}
