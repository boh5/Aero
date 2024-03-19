import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  AutoformatRule,
  autoformatSmartQuotes,
} from "@udecode/plate-autoformat"

import { autoformatIndentLists } from "@/components/plate-ui/autoformat/autoformatIndentLists"

import { autoformatBlocks } from "./autoformatBlocks"
import { autoformatMarks } from "./autoformatMarks"

export const autoformatRules: AutoformatRule[] = [
  ...autoformatBlocks,
  ...autoformatMarks,
  ...autoformatIndentLists,
  ...autoformatSmartQuotes,
  ...autoformatPunctuation,
  ...autoformatLegal,
  ...autoformatLegalHtml,
  ...autoformatArrow,
  ...autoformatMath,
]
