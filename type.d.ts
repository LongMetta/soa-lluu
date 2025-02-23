export namespace AppTypes {

export interface Data {
  id: string
  language: string
  head_menu: string[]
  banner_title: string[]
  banner_menu: string[]
  bloc_1: Bloc1
  bloc_2: Bloc2
  bloc_2_2: Bloc22
  bloc_3: Bloc3
  carte_point: CartePoint[]
  bloc_4: Bloc4
  bloc_5: Bloc5
  bloc_6: Bloc6
  footer: Footer
}

export interface Bloc1 {
  title: string
  subtitle: string
  cases: Case[]
}

export interface Case {
  category: string
  tagline: string
  description: string
  cta: string
}

export interface Bloc2 {
  title: string
  cases: string[]
}

export interface Bloc22 {
  title: string
  btn_1: string[]
  btn_2: string[]
  btn_3: string
  btn_4: string[]
  btn_5: string
  btn_6: string
}

export interface Bloc3 {
  title: string
  more_info: string
  cases: Case2[]
}

export interface Case2 {
  category: string
  tagline: string
  description: string
}

export interface CartePoint {
  name: string
  website: string
  address: string
  phone: unknown
  free_call?: string
  fax?: string
  email?: string
  activities: string[]
  marker_information: string[]
  coordinates?: Coordinates
}

export interface Coordinates {
  latitude: string
  longitude: string
}

export interface Bloc4 {
  title: string
  subtitle: string
  text_title: string
  text: string
  pictos: Picto[]
}

export interface Picto {
  title: string
  description: string
}

export interface Bloc5 {
  title: string
  text: string
  reviews: Review[]
  footer: string
}

export interface Review {
  author: string
  review: string
  date: string
}

export interface Bloc6 {
  title: string
  subtitle: string
  text: string
  button: string
}

export interface Footer {
  address: Address
  links: Link[]
}

export interface Address {
  name: string
  phone: string
  location: string
}

export interface Link {
  name: string
  url: string
}

}