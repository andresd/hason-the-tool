const hasNumber = (value: string) => {
  return new RegExp(/[0-9]/).test(value)
}

const hasMixed = (value: string) => {
  return new RegExp(/[a-z]/).test(value) &&
        new RegExp(/[A-Z]/).test(value)
}

const hasSpecial = (value: string) => {
  return new RegExp(/[!#@$%^&*)(+=._-]/).test(value)
}

const getPasswordStrengthValue = (value: string) => {
  let strengths = 0

  if (value.length > 5) {
    strengths++
  }

  if (value.length > 7) {
    strengths++
  }

  if (hasNumber(value)) {
    strengths++
  }

  if (hasSpecial(value)) {
    strengths++
  }

  if (hasMixed(value)) {
    strengths++
  }

  return strengths
}

export interface IPasswordStrength {
  color: string;
  strength: number;
  label: string;
}

export const getPasswordStrength = (password?: string) => {
  let count = 0
  if (password) {
    count = getPasswordStrengthValue(password)

    if (count >= 5) {
      return {
        color: 'green',
        strength: count,
        label: 'strong'
      }
    }
    if (count >= 4) {
      return {
        color: 'limegreen',
        strength: count,
        label: 'good'
      }
    }
    if (count >= 3) {
      return {
        color: 'orange',
        strength: count,
        label: 'fair'
      }
    }
    if (count >= 2) {
      return {
        color: 'gold',
        strength: count,
        label: 'weak'
      }
    }
  }
  return {
    color: 'red',
    strength: count,
    label: 'very weak'
  }
}
