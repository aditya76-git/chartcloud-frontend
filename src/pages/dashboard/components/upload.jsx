import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Upload = () => {
    const [file, setFile] = useState(null)
    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {

            const res = await fetch("https://chartcloud-backend.onrender.com/api/user/files/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZGl0eWFyYWo3NjEyIiwiaWQiOiI2ODRkNWM2NjUyNGMwZjQzOWI2Y2U4NWMiLCJyb2xlIjoiYWRtaW4iLCJ0eXBlIjoiYWNjZXNzIiwiaXNzdWVyIjoiY2hhcnRjbG91ZCIsImlhdCI6MTc1MDc3MDY1OCwiZXhwIjoxNzUwNzcxMjU4fQ.PExSkY9O4kW1iyMP19lP6LJW0rrK9YSkIpI-tZktybk`,
                },
                body: formData,
            });

            const result = await res.json();

            console.log(result)
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
        }
    };


    return <>
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-4">
                <Card className="p-6 space-y-4">
                    <Label htmlFor="file">Upload Excel File (.xlsx)</Label>
                    <Input
                        id="file"
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <Button onClick={handleUpload} disabled={!file}>
                        Upload
                    </Button>
                </Card>
            </div>
            <div className="w-full md:w-1/2 p-4">

                <Card className="p-6 space-y-4">
                    <Label>Select X and Y axis</Label>
                    <div className="flex flex-row gap-2">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select X-Axis" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Y-Axis" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button>
                        Create Chart
                    </Button>
                </Card></div>
        </div>
    </>
}

export default Upload