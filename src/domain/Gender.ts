export const enum Gender {
  Other = -1,
  Male = 0,
  Female = 1,
}

export default function genderAsString(gender: Gender | undefined) {
  switch (gender) {
    case Gender.Female:
      return "Feminino";
    case Gender.Male:
      return "Masculino"
    default:
      return "Outro";
  }
}