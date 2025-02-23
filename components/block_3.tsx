"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "./calendar";
import { RichTextEditor } from "./rich-text-editor";

export default function Block_3() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6));

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className=" text-2xl md:text-4xl font-bold text-center mb-7 md:mb-12 text-secondaryBg">
        NOS ACTIVITÉS
      </h1>

      <div className="bg-white rounded-3xl p-6 shadow-sm border mb-8">
        <div className="flex items-center justify-center mb-6 gap-5">
          <button onClick={handlePreviousMonth}>
            <ChevronLeft className="h-6 w-6 text-secondaryBg" />
          </button>
          <h2 className="text-base md:text-xl font-medium text-textMain capitalize">
            {currentMonth.toLocaleString("fr-FR", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={handleNextMonth}>
            <ChevronRight className="h-6 w-6 text-secondaryBg" />
          </button>
        </div>
        <Calendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>

      <form className="space-y-6">
        <div className="flex items-center gap-10 w-full">
          <Label htmlFor="name" className="text-gray-600 font-medium">
            Nom:
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Entrez votre nom"
            className="mt-1 rounded-full border-gray-200 "
          />
        </div>

        <div className="flex items-center gap-10 w-full">
          <Label htmlFor="email" className="text-gray-600 font-medium">
            Email:
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Entrez votre e-mail"
            className="mt-1 rounded-full border-gray-200"
          />
        </div>

        <div className="flex gap-5 w-full">
          <Label className="text-gray-600 font-medium">Message:</Label>
          <RichTextEditor />
        </div>

        <div className="flex gap-10 w-full">
          <Label htmlFor="file" className="text-gray-600 font-medium">
            Fichier:
          </Label>
          <div className="mt-1 w-full flex flex-wrap gap-1 items-center">
            <Input
              id="file"
              type="file"
              accept=".pdf"
              className="hidden rounded-full"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => document.getElementById("file")?.click()}
              className="w-fit border-gray-200 text-[#1E88F9] font-medium  hover:bg-gray-50 rounded-full"
            >
              <Paperclip className="mr-2 h-4 w-fit" />
              Pièce jointe
            </Button>
            <span> (*fichiers pdf uniquement)</span>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-10 w-full md:w-fit"
          >
            Clear All
          </Button>
          <Button
            type="submit"
            className="rounded-full bg-[#E85C3F] hover:bg-[#E85C3F]/90 px-10 w-full md:w-fit"
          >
            Envoyer
            <Send className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
