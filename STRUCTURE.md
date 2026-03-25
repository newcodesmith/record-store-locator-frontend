# Project Structure Guide

## Overview
The project has been refactored following React best practices with a clear separation of concerns, centralized state management using Context API, and functional components throughout.

## Directory Structure

```
record-store-locator-frontend/
├── src/
│   ├── screens/           # Screen components (full pages)
│   │   ├── HomeScreen.js      # Login/auth entry point
│   │   ├── MapHome.js         # Map view with store locations
│   │   ├── MapHome.web.js     # Web fallback for map
│   │   └── StoreInfo.js       # Store detail view
│   │
│   ├── components/        # Reusable components (UI/feature)
│   │   ├── StoreLocations.js  # Map markers
│   │   ├── StoreComments.js   # Review list
│   │   ├── AddCommentModal.js # Add review modal
│   │   ├── EditCommentModal.js # Edit review modal
│   │   └── MapStyle.json      # Google Maps custom style
│   │
│   ├── context/           # React Context providers
│   │   ├── StoreContext.js    # Global store state
│   │   └── CommentsContext.js # Global comments state
│   │
│   ├── hooks/             # Custom React hooks
│   │   ├── useStores.js       # Access stores context
│   │   ├── useComments.js     # Access comments context
│   │   └── useFacebookAuth.js # Facebook auth logic
│   │
│   ├── services/          # API & business logic
│   │   ├── storeService.js    # Store API calls
│   │   └── commentService.js  # Comment CRUD & helpers
│   │
│   └── constants/         # App constants & config
│       ├── config.js          # API URLs, app settings
│       └── colors.js          # Theme colors & styles
│
├── components/            # Legacy (deprecated - can be removed)
├── assets/                # Images, icons
├── App.js                 # Root app component with providers
├── app.json               # Expo config
├── package.json           # Dependencies
└── .env.example          # Environment variables template
```

## Key Architectural Changes

### 1. **State Management (Context API)**
- **Before**: State scattered across components, prop drilling through 3+ levels
- **After**: Centralized in `StoreContext` and `CommentsContext`
- **Usage**: Components use `useStores()` and `useComments()` hooks

```javascript
// Example usage in a component
import { useComments } from '../hooks/useComments';

const MyComponent = () => {
  const { comments, isLoading, loadComments } = useComments();
  // No prop drilling needed!
};
```

### 2. **Service Layer**
All API calls centralized in `/src/services/`:
- `storeService.js` - Fetch stores, get store by ID
- `commentService.js` - CRUD operations for comments + helper functions

Benefits:
- Single source of truth for API endpoints
- Easier to mock for testing
- Consistent error handling

### 3. **Custom Hooks**
- `useFacebookAuth()` - Encapsulates Facebook auth logic
- `useStores()` - Simplified access to stores context
- `useComments()` - Simplified access to comments context

### 4. **Constants Centralization**
- **config.js**: API URLs, app IDs (support for `.env`)
- **colors.js**: Theme colors, map styles

### 5. **Component Conversion**
All class components converted to functional components with hooks:
- ✅ HomeScreen (was already functional, now uses hooks & context)
- ✅ MapHome (class → functional)
- ✅ StoreInfo (class → functional)
- ✅ StoreComments (class → functional)
- ✅ AddCommentModal (class → functional)
- ✅ EditCommentModal (class → functional)
- ✅ StoreLocations (class → functional)

## Environment Setup (Optional)

Create a `.env` file in the root directory:

```bash
# .env
EXPO_PUBLIC_API_URL=https://vinyl-finder-server-6897eaebc32c.herokuapp.com
EXPO_PUBLIC_FACEBOOK_APP_ID=1149728978500849
```

And `.env.example` (commit to repo):
```bash
# .env.example
EXPO_PUBLIC_API_URL=https://api-url-here.com
EXPO_PUBLIC_FACEBOOK_APP_ID=your-facebook-app-id
```

Note: Expo only exposes variables prefixed with `EXPO_PUBLIC_`.

## Component API Changes

### HomeScreen Props
- **Before**: Accepted props from App.js
- **After**: Uses context hooks directly
```javascript
const HomeScreen = ({ navigation }) => {
  const { stores, isLoading } = useStores(); // No prop drilling!
  const { isSigningIn } = useFacebookAuth();
};
```

### StoreInfo Props
```javascript
const StoreInfo = ({ route }) => {
  const { comments } = useComments(); // From context
  const { stores } = useStores();     // From context
};
```

### Modals Props
- `AddCommentModal` now uses callback: `onCommentAdded()`
- `EditCommentModal` now uses callback: `onCommentUpdated()`

## Migration from Old Structure

If you need to reference old components (during transition):
- Old: `/components/HomeScreen.js`
- New: `/src/screens/HomeScreen.js`
- Old: `/components/AddCommentModal.js`
- New: `/src/components/AddCommentModal.js`

## Best Practices Implemented

✅ **Separation of Concerns**: Logic, UI, state are clearly separated
✅ **DRY Principle**: API calls, helpers in services
✅ **Single Responsibility**: Each component/service has one job
✅ **Performance**: useMemo for expensive calculations, useCallback for functions
✅ **Error Handling**: Try-catch with user-friendly alerts
✅ **Loading States**: ActivityIndicators show data is loading
✅ **PropTypes**: Validation for component props
✅ **Testability**: Service layer makes unit testing easy
✅ **Accessibility**: testID props for component testing

## Testing

Services can be tested independently:
```javascript
// Example: test commentService.js
import { calculateAverageRating } from '../services/commentService';

test('calculateAverageRating with empty array', () => {
  expect(calculateAverageRating([])).toBe(0);
});

test('calculateAverageRating calculates correctly', () => {
  const comments = [
    { rating: 5 }, 
    { rating: 3 }, 
    { rating: 4 }
  ];
  expect(calculateAverageRating(comments)).toBe(4);
});
```

## Future Enhancements

1. **TypeScript Migration**: Type safety for all imports/exports
2. **Unit Tests**: Jest + React Testing Library for services and components
3. **Error Boundaries**: Wrap contexts with error boundary for graceful failures
4. **Redux**: If app grows beyond current needs
5. **Async State Management**: React Query for advanced caching

## Troubleshooting

### "Cannot find module" errors
- Ensure you're importing from `src/` folder (new structure)
- Clear Metro cache: `npx expo start --clear`

### Context values undefined
- Make sure component is wrapped with `<StoreProvider>` and `<CommentsProvider>`
- Check `App.js` has provider hierarchy correct

### Styling issues
- Check COLORS import from `src/constants/colors.js`
- Some old hard-coded colors may remain in some files

---

**Last Updated**: March 25, 2026  
**Version**: 1.0.0 (Restructured)
