import { useState } from "react";
import { Button, Input, Spacer, Select, SelectItem } from "@nextui-org/react";
import { MemberType } from "@/types";

interface UserDetailsProps {
    userProps: MemberType | undefined;
    onSubmit: (data: MemberType) => boolean | Promise<boolean>;
}

const UserDetailsEdit = (props: UserDetailsProps) => {
    if (!props.userProps) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState(props.userProps);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const response = await props.onSubmit(formData);
        setIsLoading(false);
        if (response) {
            // setSuccess(true);
        }
    };

    const inputFields = [
        { label: "Name:", value: formData.name, placeholder: "No User Name", field: "name" },
        { label: "Email:", value: formData.email, placeholder: "No User Mail", field: "email" },
        { label: "Phone Number:", value: formData.contactNo, placeholder: "No Phone Number", field: "contactNo" },
        { label: "Gender:", value: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1), placeholder: "Gender Not Defined", field: "gender" },
    ];

    return (
        <div className="flex flex-col gap-2 w-full">
            {inputFields.map((field, index) => (
                field.field === 'gender' ? (
                    <Select
                        key={index}
                        label="Gender:"
                        placeholder="Select Gender"
                        labelPlacement="outside-left"
                        className="max-w-xs"
                        disableSelectorIconRotation
                        value={field.value}
                        onChange={(e) => handleInputChange(e, field.field)}
                    >
                        <SelectItem key='male' value="male">Male</SelectItem>
                        <SelectItem key='fmale' value="fmale">Female</SelectItem>
                        <SelectItem key='other' value="other">Other</SelectItem>
                    </Select>
                ) : (
                    <Input
                        fullWidth
                        className="w-full"
                        key={index}
                        label={field.label}
                        variant="bordered"
                        value={field.value}
                        placeholder={field.placeholder}
                        labelPlacement="outside-left"
                        onChange={(e) => handleInputChange(e, field.field)}
                    />
                )
            ))}
            <Spacer y={1} />
            <Button
                fullWidth
                color="primary"
                onClick={handleSubmit}
                disabled={isLoading}
                isLoading={isLoading}
            >
                Save Changes
            </Button>
        </div>
    );
};

export default UserDetailsEdit;