import { ChangeEvent, FormEvent, useState } from "react"
import { states } from "../lib/state-data"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { addEmployee } from "../features/employee/employeeSlice"
import { NavLink } from "react-router-dom"
import { USER_MOCK } from "../lib/mock"
import { IoIosClose } from "react-icons/io"
import DatePicker from "../components/DatePicker"

interface FormValues {
  firstName: string
  lastName: string
  birthdate: string
  startDate: string
  street: string
  city: string
  state: string
  zipCode: string
  department: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  birthdate?: string
  startDate?: string
  street?: string
  city?: string
  state?: string
  zipCode?: string
  department?: string
}

const formErrorsMessages = {
  firstName: "Please fill in the employee's first name",
  lastName: "Please fill in the employee's last name",
  birthdate: "Please fill in the employee's date of birth",
  startDate: "Please enter the employee's starting date",
  street: "Please fill in the employee's street name",
  city: "Please fill in the employee's city",
  state: "Please select a state",
  zipCode: "Please fill in the employee's zip code",
  department: "Please select a department",
}

export default function EmployeeFormPage() {
  const dispatch = useDispatch<AppDispatch>()

  const [showModal, setShowModal] = useState<boolean>(false)

  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    birthdate: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormErrors({ ...formErrors, [event.target.name]: "" })
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    })
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFormErrors({ ...formErrors, [event.target.name]: "" })
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    })
  }

  function validateForm(): boolean {
    let errors: FormErrors = {}
    for (let key in formValues) {
      if (!formValues[key as keyof FormValues]) {
        errors[key as keyof FormErrors] =
          formErrorsMessages[key as keyof FormErrors]
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (validateForm()) {
      dispatch(addEmployee(formValues))
      setShowModal(true)
    }
  }

  function generateMock() {
    dispatch(addEmployee(USER_MOCK))
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 p-8 pt-20 h-full">
      <h1 className="text-3xl font-bold mb-4">Create Employee</h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 w-full max-w-[400px] lg:max-w-[700px]"
      >
        <div className="flex flex-col gap-6 w-full lg:flex-row">
          <div className="flex flex-1 flex-col gap-4 lg:w-1/2">
            <legend className="text-xl font-semibold opacity-60">
              Identity
            </legend>

            <FormInput
              label="First Name"
              formControlName="firstName"
              formValues={formValues}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
            />

            <FormInput
              label="Last Name"
              formControlName="lastName"
              formValues={formValues}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
            />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="birthdate">Date of birth</label>
                <DatePicker
                  id="birthdate"
                  value={formValues.birthdate}
                  onChange={(date) => {
                    setFormValues((prevFormValues) => ({
                      ...prevFormValues,
                      birthdate: date,
                    }))
                    setFormErrors((prevFormErrors) => ({
                      ...prevFormErrors,
                      birthdate: "",
                    }))
                  }}
                />
                {formErrors["birthdate"] && (
                  <div className="text-sm text-red-500">
                    {formErrors["birthdate"]}
                  </div>
                )}
              </div>

              <FormInput
                label="Start date"
                formControlName="startDate"
                type="date"
                formValues={formValues}
                formErrors={formErrors}
                handleInputChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 lg:w-1/2">
            <legend className="text-xl font-semibold opacity-60">
              Address
            </legend>

            <FormInput
              label="Street"
              formControlName="street"
              formValues={formValues}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
            />

            <FormInput
              label="City"
              formControlName="city"
              formValues={formValues}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="state">State</label>
              <select
                name="state"
                id="state"
                value={formValues.state}
                onChange={handleSelectChange}
              >
                <option value={""}>-- Please choose an option --</option>
                {states.map(({ name, abbreviation }) => (
                  <option key={name} value={abbreviation}>
                    {name}
                  </option>
                ))}
              </select>
              {formErrors.state && (
                <div className="text-sm text-red-600">{formErrors.state}</div>
              )}
            </div>

            <FormInput
              label="Zip code"
              formControlName="zipCode"
              formValues={formValues}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:max-w-[338px] self-end w-full">
          <label
            className="text-xl font-semibold opacity-60"
            htmlFor="department"
          >
            Department
          </label>
          <select
            name="department"
            id="department"
            value={formValues.department}
            onChange={handleSelectChange}
          >
            <option value={""}>-- Please choose an option --</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
          </select>
          {formErrors.department && (
            <div className="text-sm text-red-600">{formErrors.department}</div>
          )}
        </div>
        <button
          className="bg-brand text-white self-end w-full p-2 rounded-md shadow-md hover:bg-white hover:text-brand border border-transparent hover:border-brand lg:max-w-[338px]"
          type="submit"
        >
          Save
        </button>
        <button
          className="bg-brand text-white self-end w-full p-2 rounded-md shadow-md hover:bg-white hover:text-brand border border-transparent hover:border-brand lg:max-w-[338px]"
          type="button"
          onClick={generateMock}
        >
          Generate mock
        </button>
      </form>
      {showModal && <SuccessModal setShowModal={setShowModal} />}
    </div>
  )
}

function FormInput({
  label,
  formControlName,
  formValues,
  formErrors,
  handleInputChange,
  type = "text",
}: {
  label: string
  formControlName: string
  type?: "text" | "date"
  formValues: FormValues
  formErrors: FormErrors
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={formControlName}>{label}</label>
      <input
        value={formValues[formControlName as keyof FormValues]}
        onChange={handleInputChange}
        id={formControlName}
        name={formControlName}
        type={type}
      />
      {formErrors[formControlName as keyof FormErrors] && (
        <div className="text-sm text-red-500">
          {formErrors[formControlName as keyof FormErrors]}
        </div>
      )}
    </div>
  )
}

function SuccessModal({
  setShowModal,
}: {
  setShowModal: (show: boolean) => void
}) {
  return (
    <div className="absolute top-0 w-full h-[100vh] flex items-center justify-center bg-darktransparent z-[99]">
      <div className="relative flex flex-col p-10 items-center justify-center bg-white rounded-xl shadow-xl w-[500px]">
        <IoIosClose
          onClick={() => setShowModal(false)}
          className="absolute top-5 right-5 text-3xl opacity-70 hover:opacity-100 cursor-pointer"
        />
        <p className="text-brand text-3xl font-bold">Employee created !</p>
        <img src="/images/validation.gif" alt="Validation animation" />
        <NavLink
          className="nav-button min-w-[150px] text-center"
          to="/employees"
        >
          View employee list
        </NavLink>
      </div>
    </div>
  )
}
