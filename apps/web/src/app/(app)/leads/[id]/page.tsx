import { LeadSummary } from "@/components/leads/lead-summary";
import { UTMDetails } from "@/components/leads/utm-details";
import { EventTimeline } from "@/components/leads/event-timeline";
import { WhatsappThread } from "@/components/leads/whatsapp-thread";

export default function LeadDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <LeadSummary leadId={params.id} />
      <div className="grid gap-6 lg:grid-cols-2">
        <UTMDetails />
        <EventTimeline />
      </div>
      <WhatsappThread />
    </div>
  );
}
