import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartLine,
    Check,
    Eye,
    History,
    LayoutDashboardIcon,
    LogIn,
    LogInIcon,
    Upload
} from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";

const Landing = () => {

    const isAuthenticated = ['refreshToken', 'accessToken', 'expiry'].every(key => localStorage.getItem(key));


    const features = [
        {
            icon: <Upload className="w-6 h-6" />,
            title: "Excel Upload",
            description:
                "Upload your Excel files directly to ChartCloud with just a few clicks.",
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Data Visualization",
            description:
                "Select the columns you want to analyze by choosing the X and Y axes from your file headers.",
        },
        {
            icon: <ChartLine className="w-6 h-6" />,
            title: "Wide Range of Chart Types",
            description:
                "Choose from a variety of chart styles—whether it's bar, line, pie, scatter, or more.",
        },
        {
            icon: <History className="w-6 h-6" />,
            title: "Graphs & History Tracking",
            description:
                "Graphs can be downloaded in multiple formats. Track your past uploads and analyses.",
        },
    ];

    const faqs = [
        {
            question: "How do I upload my Excel files to ChartCloud?",
            answer:
                "Uploading your Excel files is easy! Simply click the 'Upload' button on the dashboard, select your Excel file from your computer, and we'll automatically process the data for analysis. Once uploaded, you can choose the columns to create charts from.",
        },
        {
            question: "What types of charts can I create with my data?",
            answer:
                "ChartCloud offers a wide variety of chart types to suit your data analysis needs. You can choose from bar charts, line charts, pie charts, scatter plots, and more. Simply select the columns for the X and Y axes, pick your chart type, and the platform will generate it for you instantly.",
        },
        {
            question: "Can I download the charts I create?",
            answer:
                "Yes! Once your chart is ready, you can easily download it in PNG or PDF format. This makes it easy to include in presentations, reports, or share with others.",
        },
        {
            question: "Can I track my previous uploads and analyses?",
            answer:
                "Absolutely! ChartCloud keeps a record of all your uploaded files and generated charts. You can easily revisit your previous uploads and analyze your past data whenever needed. Simply log in to view your history.",
        },
        {
            question: "Is my data secure on ChartCloud?",
            answer:
                "Yes, your data is safe with us. We use industry-standard encryption to ensure your files are securely uploaded and processed. Additionally, your data is stored securely, and we don’t share your information with any third parties.",
        },
    ];

    return (
        <ScrollArea className="h-screen">
            <div className="min-h-screen bg-background text-foreground">
                {/* Navbar */}
                <nav className="container mx-auto px-8 md:px-16 py-6 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        chartcloud 📊
                    </Link>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                    </div>
                </nav>

                {/* First Section */}
                <section className="container mx-auto px-4 py-12 text-center">
                    <p className="text-4xl md:text-5xl font-bold mb-4">
                        Turn excel files into{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                            Stunning Charts
                        </span>📈
                    </p>
                    <p className="text-md md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
                        Transform your data into insights with ease. Upload your Excel files, analyze them, and generate stunning, downloadable charts – all in one place!
                    </p>
                    <div className="space-x-4">
                        <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                            <Button size="lg" variant="default">
                                {isAuthenticated ? <LayoutDashboardIcon className="w-4 h-4 mr-2" /> : <LogInIcon className="w-4 h-4 mr-2" />}
                                {isAuthenticated ? 'Dashboard' : 'Get started'}
                            </Button>

                        </Link>

                    </div>
                </section>

                {/* Second Section */}
                <section className="container mx-auto px-4 py-20 md:py-12">
                    <div className="lg:flex lg:items-center lg:gap-12">
                        <div className="lg:w-1/3 mb-8 lg:mb-0 px-4">
                            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
                                Visualize Your Data Like Never Before 📊
                            </h2>
                            <p className="text-xl text-muted-foreground text-center md:text-left">
                                Upload your Excel files, analyze data, and create downloadable charts in seconds.

                            </p>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 md:p-4">
                            {features.map((feature, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <div className="mb-4">{feature.icon}</div>
                                        <CardTitle>{feature.title}</CardTitle>
                                        <CardDescription>{feature.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className="container mx-auto px-4 py-12">
                    <h2 className="text-3xl font-bold mb-2 text-center">No Pricing 🚫</h2>
                    <p className="text-xl text-muted-foreground mb-12 text-center">
                        Everything is totally free. We'd love if you could donate to keep
                        this project running.
                    </p>
                    <Card className="max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">
                                ₹0 <span className="text-2xl font-normal">/month</span>
                            </CardTitle>
                            <CardDescription>
                                For individuals wanting to analyze their charts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">

                                <li className="flex items-center">
                                    <Check className="w-5 h-5 text-green-500 mr-2" />
                                    Everything included
                                </li>

                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* FAQs */}
                <section className="container mx-auto px-8 py-12">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Frequently Asked Questions 💬
                    </h2>
                    <Accordion type="single" collapsible className="max-w-2xl mx-auto">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                {/* Footer */}
                <footer>
                    <div className="container mx-auto px-4 py-8">
                        <div className="text-center">
                            <p className="text-muted-foreground">
                                &copy; Built with ❤️ by ZIDIO Intern Team II
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </ScrollArea>
    )

}

export default Landing