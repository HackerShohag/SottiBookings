import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FormData = {
  origin: string;
  destination: string;
  date: string;
  numberOfTickets: number;
}

export type OfferedJourney = {
  bus: {
    no: string;
    companyName: string;
  };
  slot: any[];
  startTime: string;
  from: string;
  to: string;
}

export type MemberType = {
  bookedJourney: string[];
  id: string;
  name: string;
  user: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  address: string;
  isDeleted: boolean;
}

export type BusType = {
  _id: string;
  companyName: string;
  no: string;
  capacity: number;
  slot: string[];
  __v: number;
};