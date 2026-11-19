# Document collection blueprint

This repository is an interactive **proposed specification** for Finance OS GHL builders. It is not a working borrower portal or a live CRM integration.

- Read `README.md` and the two source documents in `docs/` before changing business rules.
- `src/model.ts` owns workflow topology and builder details. `src/intake.ts` owns the illustrative form scenarios. Keep the presentation and exported JSON consistent.
- Fixed founder defaults: six months for home-loan refinance; six months for a card consolidated into the home loan; three months for a retained card. Apply per account. No broker period override.
- Other periods and unapproved behaviours remain visibly proposed. Collection defaults must not be described as universal lender requirements.
- Preserve the retained 70-entry catalogue and its exclusions. Broader catalogue items without resolved rules are not automatically issued by the form demonstrator.
- Contact tags are summaries across requests. Never clear the last needed tag merely because one of several accounts or loans received an upload.
- Use synthetic data in examples. Do not persist form entries, add credentials, connect GHL, send messages or deploy without an explicit instruction.
- Validate with `npm test`, `npm run build`, `npm run package` and the documented browser checks. Rebuild the portable HTML after changing the UI. Browser checks validate the blueprint, not GHL feasibility.
