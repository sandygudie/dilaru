"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "./TextField";
type Inputs = {
  surname: string;
  firstname: string;
  middlename: string;
  issuedDate: string;
  dob: string;
  height: number;
  gender: string;
  expiryDate: "";
  nationality: "";
  ninNo: "";
  age: "";
};

interface NinFormProps {
  handleNinForm: (formValues: any) => void;
}
export default function NinForm({ handleNinForm }: NinFormProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleNinForm(data);
  };
  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl">User data</h2>
      <span className="text-sm">*All fields are required</span>
      <div className="mt-8 flex flex-wrap  items-center justify-between">
        <TextField
          register={{ ...register("surname", { required: true }) }}
          type="text"
          label="Surname"
          name="surname"
          placeholder="Surname"
        />
        <TextField
          register={{ ...register("firstname", { required: true }) }}
          type="text"
          label="First Name"
          name="firstname"
          placeholder="Firstname"
        />
        <TextField
          register={{ ...register("middlename", { required: true }) }}
          type="text"
          label="Middle Name"
          name="middlename"
        />

        <TextField
          register={{ ...register("issuedDate", { required: true }) }}
          type="Date"
          label="Issued Date"
          name="issuedDate"
        />
        <TextField
          register={{ ...register("dob", { required: true }) }}
          type="Date"
          label="Date Of Birth"
          name="dob"
        />

        <TextField
          register={{ ...register("gender", { required: true }) }}
          type="text"
          label="Sex"
          name="gender"
        />
        <TextField
          register={{ ...register("height", { required: true }) }}
          type="number"
          label="Height(cm)"
          name="height"
          min={0}
        />
        <TextField
          register={{ ...register("expiryDate", { required: true }) }}
          type="Number"
          label="Expiry"
          name="expiryDate"
          min={0}
        />
        <TextField
          register={{ ...register("nationality", { required: true }) }}
          type="text"
          label="Nationality"
          name="nationality"
        />
        <TextField
          register={{ ...register("ninNo", { required: true }) }}
          type="text"
          label="NIN No."
          name="ninNo"
        />
      </div>
      <div className="text-center my-8">
        <button className="px-10 py-3 bg-yellow text-white font-bold rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
}
