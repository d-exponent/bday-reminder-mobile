import settings from 'infrastructure/settings'
import * as yup from 'yup'

yup.addMethod<yup.StringSchema>(yup.string, 'email', function email() {
  return this.matches(settings.validRegex.email, {
    message: 'Invalid email address',
    name: 'email',
    excludeEmptyString: false
  })
})

yup.addMethod<yup.StringSchema>(yup.string, 'phone', function phone() {
  return this.matches(settings.validRegex.phone, {
    message: 'Include the country code',
    name: 'phone',
    excludeEmptyString: true
  })
})

yup.addMethod<yup.StringSchema>(yup.string, 'accessCode', function () {
  return this.matches(settings.validRegex.accessCode, {
    name: 'accessCode',
    message: 'Invalid access code',
    excludeEmptyString: false
  })
})

export type stringSchema = yup.StringSchema<string, yup.AnyObject, undefined, ''>

declare module 'yup' {
  interface StringSchema {
    phone: () => stringSchema
    accessCode: () => stringSchema
  }
}

type validateArgs = Array<'phone' | 'email' | 'name' | 'accessCode'>

interface Validators {
  phone: stringSchema
  email: stringSchema
  accessCode: stringSchema
  name: stringSchema
}

const validate = (...args: validateArgs): Record<string, stringSchema> => {
  if (args.length === 0) throw new Error('Pass at least one valid argument')

  const validators: Partial<Validators> = {}

  args.forEach(arg => {
    switch (arg) {
      case 'phone':
        validators[arg] = yup.string().required('Phone number is required').phone()
        break
      case 'email':
        validators[arg] = yup.string().required('Email address is required').email()
        break
      case 'name':
        validators[arg] = yup.string().required('Name is required')
        break
      case 'accessCode':
        validators[arg] = yup.string().required('Access code is required').accessCode()
        break
      default:
        throw new Error('Invalid validator key') // Unlikely to ever happen
    }
  })
  return validators
}

export { yup as default, validate }
