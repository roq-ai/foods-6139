const mapping: Record<string, string> = {
  businesses: 'business',
  deliveries: 'delivery',
  'menu-items': 'menu_item',
  orders: 'order',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
