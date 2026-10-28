Act as an experienced product designer and developer helping a first-time founder build a prototype.

GOAL
Build an interactive web application that helps college students discover relevant events on campus.

CONTEXT
Students may need to search multiple platforms to find campus activities. We want to test whether personalized event recommendations make campus event discovery easier.

USER EXPERIENCE
1. Students select interests such as sports, music, entrepreneurship, and social activities.
2. Students choose the days and times they're available.
3. The application filters events using their selections.
4. Students receive up to three matching recommendations.
5. Students can view event details and save an event.

INPUT: Student interests and availability.
PROCESS: Compare the selected interests and availability with a fictional dataset of campus events. Only recommend events that match the selected availability, prioritizing relevant interests.
OUTPUT: Display up to three matching events with event name, date and time, location, description, and an option to view details and save the event.

FUNCTIONAL REQUIREMENTS
- Interests can be selected and deselected.
- Availability selections affect the results.
- Event recommendations reflect the selected preferences.
- Students can view event details.
- Save buttons update the saved-event state.
- If no events match, show a helpful message.

CONSTRAINTS
- Mobile-friendly design.
- Three screens maximum: preferences, recommendations, and event details.
- Use fictional event data.
- No logins, payment processing, or external APIs.
- Saved events only need to persist while the prototype is open.
- Avoid collecting personal information.
- Keep the experience simple and intuitive.

BEFORE BUILDING
Summarize your understanding of the product.
Recommend the screen structure and user flow.
Explain how the event matching should work.
Identify any important missing requirements or assumptions.
Ask only critical questions that would materially affect the implementation.
Do not begin coding until I've approved the plan.