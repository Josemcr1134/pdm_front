export  interface loginResponse {
  access: string,
  refresh: string,
  user: {
    full_name: string,
    email: string,
    company: {
      id: string,
      name: string,
      code: string,
      company_type: string
    }
  }
}
