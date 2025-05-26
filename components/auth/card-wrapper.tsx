"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import AuthHeader from "./auth-header";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  title: string;
  showSocial?: boolean;
  backButtonHref: string;
}
/**
 * A wrapper component for authentication-related cards.
 * 
 * Renders a card layout with a customizable header, content, and footer.
 * The header displays a title and label, the content renders the children,
 * and the footer includes a back button.
 *
 * @component
 * @param {Object} props - The props for CardWrapper.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 * @param {string} props.headerLabel - The label to display in the card header.
 * @param {string} props.backButtonLabel - The label for the back button in the footer.
 * @param {string} props.title - The title to display in the card header.
 * @param {boolean} [props.showSocial] - Whether to show social login options (currently unused).
 * @param {string} props.backButtonHref - The href for the back button.
 *
 * @returns {JSX.Element} The rendered card wrapper component.
 */
const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, title}: CardWrapperProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <AuthHeader label={headerLabel} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;