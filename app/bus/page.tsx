'use client';

import { useEffect, useState } from "react";
import { FormData, OfferedJourney } from "@/types";

import MultiStepPage from "./MultiStepPages/MultiStepPages";
import PageOne from "./MultiStepPages/PageOne/PageOne";
import PageThree from "./MultiStepPages/PageThree/PageThree";
import PageTwo from "./MultiStepPages/PageTwo/PageTwo";
import { fetchRoutes, fetchOfferedJourney } from "./fetchFunction";
import Head from "next/head";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import SeatLayout from "@/components/BusSeatLayout/BusSeatLayout";
import { siteConfig } from "@/config/site";
import { useSession } from "next-auth/react";
import ProcessingFee from "@/components/ProcessingFee/ProcessingFee";


const BusService = () => {

    const { data: session, status } = useSession();


    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const [isNextButtonAvailable, setIsNextButtonAvailable] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [routes, setRoutes] = useState<string[]>([]);
    const [offeredJourneys, setOfferedJourneys] = useState<OfferedJourney[]>([]);
    const [selectedID, setSelectedID] = useState<string>();
    const [currentOfferedJourney, setCurrentOfferedJourney] = useState<OfferedJourney | null>(null); // Added currentOfferedJourney state

    const [formData, setFormData] = useState<FormData>({
        origin: '',
        destination: '',
        date: '',
        numberOfTickets: 0,
    });

    const searchParams = new URLSearchParams();
    searchParams.set('source', formData.origin);
    searchParams.set('destination', formData.destination);
    searchParams.set('date', formData.date);
    if (typeof window !== 'undefined') {
        window.history.pushState({}, '', `?${searchParams.toString()}`);
    }


    const handlePageOneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleBook = () => {

        fetch(siteConfig.backendServer.address + '/booking/create-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '' + session?.accessToken
            },
            body: JSON.stringify({
                "journey": selectedID,
                "userId": 1,
                "slot": selectedSeats,
            })
        }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

        console.log('Booked');
    }


    useEffect(() => {
        setProcessing(true);
        const fetchRoutesFunction = async () => {
            const data = await fetchRoutes();
            setRoutes(data);
        }
        fetchRoutesFunction();
        setProcessing(false);
    }, []);

    const nextButtonFunction = () => {
        setProcessing(true);
        const fetchOfferedJourneyFunction = async () => {
            const data = await fetchOfferedJourney(formData);
            setOfferedJourneys(data);
            if (offeredJourneys.length > 0) {
                setIsNextButtonAvailable(true);
            }
        }
        fetchOfferedJourneyFunction();
        setProcessing(false);
        setIsNextButtonAvailable(false);
    }

    const dummyOfferedJourney: OfferedJourney[] = [
        {
            id: "1",
            bus: {
                companyName: "Bus Company X",
                no: "Bus X",
            },
            startTime: "9:00 AM",
            from: "Dhaka",
            to: "Sylhet",
            fare: 80,
            slot: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
        },
        {
            id: "2",
            bus: {
                companyName: "Bus Company Y",
                no: "Bus Y",
            },
            startTime: "10:00 AM",
            from: "Dhaka",
            to: "Sylhet",
            fare: 90,
            slot: ['A1', 'A2', 'A3', 'A4', 'B1', 'B3', 'B4'],
        },
        {
            id: "3",
            bus: {
                companyName: "Bus Company Z",
                no: "Bus Z",
            },
            startTime: "11:00 AM",
            from: "Dhaka",
            to: "Sylhet",
            fare: 100,
            slot: ['A1', 'A2', 'A3', 'A4', 'C1', 'C2', 'C3', 'C4'],
        },
        {
            id: "3",
            bus: {
                companyName: "Bus Company Z",
                no: "Bus Z",
            },
            startTime: "11:00 AM",
            from: "Dhaka",
            to: "Sylhet",
            fare: 100,
            slot: ['A1', 'A2', 'A3', 'A4', 'C1', 'C2', 'C3', 'C4'],
        },
        {
            id: "3",
            bus: {
                companyName: "Bus Company Z",
                no: "Bus Z",
            },
            startTime: "11:00 AM",
            from: "Dhaka",
            to: "Sylhet",
            fare: 100,
            slot: ['A1', 'A2', 'A3', 'A4', 'C1', 'C2', 'C3', 'C4'],
        },
    ];

    const bookButtonHandle = (id: string) => {
        setSelectedID(id);
        setCurrentOfferedJourney(dummyOfferedJourney.find(journey => journey.id === id) || null);
        onOpen();
    }

    const setSeatsButton = (seats: string[]) => {
        setSelectedSeats(seats);
        console.log(seats);
    }

    const formElements = [
        <PageOne key="pageOne" processing={processing} routes={routes} formData={formData} handleChange={handlePageOneChange} handleDataAvialblity={setIsNextButtonAvailable} />,
        <PageTwo key="pageTwo" processing={processing} offeredJourney={dummyOfferedJourney} bookButtonHandle={bookButtonHandle} />,
        <PageThree key="pageThree" />
    ];

    return (
        <>
            <Head>
                <title>
                    Bus Ticket Booking Service | Shotti Bookings
                </title>
                <meta
                    name="description"
                    content="Bus Ticket Booking Service | Shotti Bookings"
                    key="desc"
                />
            </Head>

            <MultiStepPage MultiStepFormElements={formElements} nextButtonAvailable={isNextButtonAvailable} nextButtonFunction={nextButtonFunction} />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Select Seats</ModalHeader>
                            <ModalBody>
                                <SeatLayout setSeatsButton={setSeatsButton} ticketStatus={{ available: "Available", booked: "Selected", occupied: "Occupied" }} />
                                {
                                    selectedSeats.length > 0 && currentOfferedJourney ? <ProcessingFee seats={selectedSeats} cost={currentOfferedJourney.fare} /> : null
                                }
                            </ModalBody>
                            <ModalFooter className="justify-between">
                                <Button variant="light" color="danger" onClick={onClose}>Cancel</Button>
                                <Button color="primary" onClick={handleBook}>Book</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default BusService;