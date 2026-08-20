import { redirect } from "next/navigation";

import nextIntlConfig from "@/next-intl.config";

export default function RootPage() {
  redirect(`/${nextIntlConfig.defaultLocale}`);
}
