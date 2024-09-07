## OneMoreStep

### Inspiration

When I was learning computer science, there were always too many knowledge to remember. So I have to rewatch the 2 hour long tutorial video again and again, sometime it's just a tiny point I can't recall but I need to delve into the whole video to find the context and the point.

So I start wondering it would be so greate if there is an app to help me remember all the knowledge perpetually, and give me the functionality to quickly review all the knowledge I have learned.

So an flashcard app occurred to me, using the forgetting curve to continuously show you the knowlegde you have learned in a proper pace and you can have your own real account to save all the cards you've made and quickly review them.

It may be just making another wheel, but I think it's a greate way to training my web development skill and a greate final project idea.

### Framework and Libraries

The app is made by React.js and google firebase.

#### Why React

React is so convenient to build reusable UI. And it's the most used frontend frame work, it would be benefit so much if you are familiar with the React.

A flashcard app is mostly about card, and different data or sate passing from card to card. So the concept of component and prop would be pretty useful when building this app.

And React has a huge richful ecosystem, there are so many utilities you can use. For example, this app is a single page web app, so I can use the React router to easily routing from page to page. And when I want add some amination effects to my app, the "react-transition-group" library helped me a lot.

#### Why firebase

It's free and has a lot useful utilities like fire store and Authentication. So I can easily store the cards data and create accounts.
And I can easily find a plenty tutorial on the Youtube.

### Functionalities

The App mainly has three functionalities:

#### Create Card

Every card has two parts, the question and the answer.

You can easily create cards as you want, and all the new created cards will update to the firestore, not only the card itself, but also the time when the card should be showed up again. When just create the card, you can immediately recite it.

#### Recite cards

After you create some cards, you should recite them until you totally remember them.
It won't spend to much time because the cards won't show up everyday. Insteadly, it depends on how solid you remember them, the solider, the less they will show up.

The card won't show you the answer part until you click any one of the three buttons down the card.
When recite every single card, you have 3 different choices: Clear, Not really, Forget. Every choice consistent with a diffrent calculating logic to calculate when the card should show up next time.

Assuming that you are always clear about this card, the card show up schedule should be 1 / 3 / 7 / 12 / 30 / 60 days later. After the sixth time the logic will consider you have deeply remembered the card's knowledge, so it won't show up again.

Once you click the forget or misremembered button, you will back to the day when you just created the card.

#### Quick review

Every account has their own cards, and if you click you username right up the corner, you will be led to a page where shows your all cards there.
Samely all cards will just show the question part, but you can click any of them to toggle the answer part.
