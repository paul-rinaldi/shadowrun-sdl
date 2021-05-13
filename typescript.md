# Typescript Documentation
The way Typescript works can be complicated and unwieldy at first, especially in comparison to vanilla javascript. Using React and Typescript (TS) gets even a little bit more complicated - but we can lean on our understanding of Java interfaces to understand the fundamentals of what's required to make changes to this application.    

## Wins and Tradeoffs
The real win of typescript in this application isn't as pronounced as using redux but it still helps. Typescript lets us declare what types to use for each and every variable or construct of variables we use. This works well for us because we need specificity when the redux store is built but we gain the tradeoff of much more programming time in our application since everything now needs a type; even when reading parts of json - sometimes. 

### Example Win/Tradeoff
For example, in ``` src/models/playerModels.ts ```, we've built a few types, or 'interfaces' to be precise in typescript terminology, to model some shadowrun domain objects:
![alt text](typescript_guide_assets/PlayerModels_TS_Interfaces_2021-05-13 07-03-36.png)

### Some common rules for React + TS:
- 

### Essential fundamentals:
- 1 - interfaces
- 2 - casting
- 3 - type checking
- 4 - 

## As of Spring 2021: 
-	**ts model files**  are located in:  [src/models/playerModels.ts](src/models/playerModels.ts)

## Learn more
[](for new javascript prorammers)
[]()